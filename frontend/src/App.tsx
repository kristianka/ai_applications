import { FileUpload } from "./components/ui/file-upload";

function App() {
    return (
        <main className="min-h-screen">
            <h1 className="text-3xl font-bold text-center my-10">File upload</h1>
            <div className="m-10">
                <FileUpload />
            </div>
        </main>
    );
}

export default App;
