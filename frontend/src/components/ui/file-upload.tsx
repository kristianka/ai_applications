import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";

interface item {
    description: string;
    score: number;
}

export function FileUpload(props: Partial<DropzoneProps>) {
    const [data, setData] = useState<item[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

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
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Dropzone
                onDrop={async (files) => {
                    setLoading(true);
                    await uploadFile(files[0]);
                    setLoading(false);
                }}
                loading={loading}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
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
            </Dropzone>
            {data && <p>{JSON.stringify(data)}</p>}
        </div>
    );
}
