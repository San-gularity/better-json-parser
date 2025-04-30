"use client"
import { useState } from "react";
import styles from "./json_parser.module.css";

export default function JsonParser() {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    const handle_input = (e: any) => {
        setInputText(e.target.value);
    }

    const handle_conversion = () => {
        setOutputText(JSON.parse(inputText));
    }

    const JsonView = ({ data, level = 0 }: { data: any, level?: number }) => {
        if(typeof data !== "object" && data === null) {
            return <span>{JSON.stringify(data)}</span>
        }

        return (
            <div>
                {Object.entries(data).map(([key, value]) => (
                    <CollapsibleSection key={key} k={key} value={value} level={level} />
                ))}
            </div>
        );
    }

    const CollapsibleSection = ({ k, value, level }: {k:any, value: any, level: any}) => {
        const [isCollapsed, setIsCollapsed] = useState(false);
        return (
            <div>
                <span>
                    {isCollapsed ? "▶" : "▼"} {k}:
                </span>
                {isCollapsed ? null : (
                    <span>
                        { typeof value == "object" && value !== null ? 
                            <JsonView data={value} level={level + 1} />
                        : 
                            <span>{JSON.stringify(value)}</span>
                        }
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className={styles.super_container}>
            <div>
                <h1 className={styles.json_title}>
                    <span
                        style={{
                            fontSize: "1rem",
                            fontFamily: "cursive",
                            verticalAlign: "super",
                        }}
                    >
                        (the better)
                    </span>
                    JSON Parser
                </h1>
            </div>
            <div className={styles.container}>
                <div className={styles.input_textarea_container}>
                    <p>Input:</p>
                    <textarea className={styles.input_textarea} onChange={handle_input}></textarea>
                </div>
                <button className={styles.convert_button} onClick={handle_conversion}>Convert</button>
                <div className={styles.output_textarea_container}>
                    <p>Output:</p>
                    <div className={styles.output_textarea}>
                        <JsonView data={inputText} />
                    </div>
                </div>
            </div>
        </div>
    );
}
