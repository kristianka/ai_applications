import { IconBrandGithub } from "@tabler/icons-react";
import { FileUpload } from "./components/file-upload";

function App() {
    return (
        <main className="min-h-screen">
            <div className="grid grid-cols-3">
                <div></div>
                <h1 className="text-3xl font-bold text-center my-10 text-white">
                    AI Image labeling
                </h1>
                <a
                    className="m-auto"
                    target="_blank"
                    href="https://github.com/kristianka/ai_applications"
                >
                    <IconBrandGithub className="text-white" size={24} />
                </a>
            </div>
            <div className="m-10">
                <FileUpload />
            </div>
        </main>
    );
}

export default App;
