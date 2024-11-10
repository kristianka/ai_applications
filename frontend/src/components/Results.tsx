import { Data } from "../types";

interface ResultsProps {
    data: Data | null;
}

export default function Results({ data }: ResultsProps) {
    return (
        <div className="rounded-lg">
            <h2 className="text-white text-2xl font-bold text-center my-5">Results</h2>
            {data && (
                <div className="text-white grid grid-cols-2">
                    <div>
                        <h3 className="text-lg font-bold mb-3">Google Cloud Vision labels</h3>
                        <ul>
                            {data.GC_labels.map((label) => (
                                <li key={label.description}>
                                    {label.description} - {Math.round(label.score * 100)}%
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-right">
                        <h3 className="text-lg font-bold mb-3">Python labels</h3>
                        <ul>
                            {data.Python_labels.map(([code, text, score]) => (
                                <li key={code}>
                                    {text} - {Math.round(score * 100)}%
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
