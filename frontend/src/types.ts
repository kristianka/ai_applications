export interface GCLabel {
    description: string;
    score: number;
}

export type PythonLabel = [string, string, number];

export interface Data {
    GC_labels: GCLabel[];
    Python_labels: PythonLabel[];
}
