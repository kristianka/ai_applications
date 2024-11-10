import "./Styles.module.css";
import { Group, Text, rem, Image } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { useState } from "react";
import { Data } from "../types";
import Results from "./Results";

export function FileUpload(props: Partial<DropzoneProps>) {
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(false);

    const [files, setFiles] = useState<FileWithPath[]>([]);

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setData(data);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="">
                <h2 className="text-white text-2xl font-bold text-center my-5">Image upload</h2>
                <Dropzone
                    onDrop={async (files) => {
                        setLoading(true);
                        await uploadFile(files[0]);
                        setFiles(files);
                    }}
                    loading={loading}
                    onReject={(files) => console.log("rejected files", files)}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    className="dark-theme-dropzone"
                    {...props}
                >
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                        <Dropzone.Accept>
                            <IconUpload
                                style={{
                                    width: rem(52),
                                    height: rem(52),
                                    color: "var(--mantine-color-blue-6)"
                                }}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                style={{
                                    width: rem(52),
                                    height: rem(52),
                                    color: "var(--mantine-color-red-6)"
                                }}
                                stroke={1.5}
                            />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconPhoto
                                style={{
                                    width: rem(52),
                                    height: rem(52),
                                    color: "var(--mantine-color-dimmed)"
                                }}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>
                        <div>
                            <Text size="xl" inline>
                                Drag an image here or click to select a file
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                Supported formats: jpg, jpeg, png, webp
                            </Text>
                        </div>
                    </Group>
                    {files && files.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 mt-4">{previews}</div>
                    )}
                </Dropzone>
            </div>
            <Results data={data} />
        </div>
    );
}
