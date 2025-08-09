import MonacoEditor from "./Editor.jsx"
import { useState, useEffect } from "react"
import "./test.css"

const reset = "{}";
const Test = () => {
    const [inputOne, setInputOne] = useState(reset)
    const [inputTwo, setInputTwo] = useState(reset)
    const [validJsonOne, setValidJsonOne] = useState(false)
    const [validJsonTwo, setValidJsonTwo] = useState(false)

    const isValidJson = (str) => {
        try {
            JSON.parse(str)
            return true
        } catch (_e) {
            return false
        }
    }

    useEffect(() => {
        if (isValidJson(inputOne)) {
            setValidJsonOne(true)
        } else {
            setValidJsonOne(false)
        }
    }, [inputOne])

    useEffect(() => {
        if (isValidJson(inputTwo)) {
            setValidJsonTwo(true)
        } else {
            setValidJsonTwo(false)
        }
    }, [inputTwo])

    return (
        <div className="grid-root">
            {/* Row 1, Col 1: Left panel (toolbar + editor) */}
            <div className="panel">
                <div className="panel-toolbar">
                    <button onClick={() => setInputOne(reset)}>Reset</button>
                    {
                        <span style={{ color: validJsonOne ? "#99cc99" : "#f2777a" }}>
                            {validJsonOne ? "Valid JSON" : "Invalid JSON"}
                        </span>
                    }
                </div>
                <div className="panel-editor">
                    <MonacoEditor
                        value={inputOne}
                        onChange={setInputOne}
                        language="json" 
                        theme="vs-dark"
                        options={{
                            wordWrap: "on",
                            fontSize: 14,
                        }}
                        minimap
                    />
                </div>
            </div>

            {/* Row 1, Col 2: Right panel (toolbar + editor) */}
            <div className="panel">
                <div className="panel-toolbar">
                    <button onClick={() => setInputTwo(reset)}>Reset</button>
                    {
                        <span style={{ color: validJsonTwo ? "#99cc99" : "#f2777a" }}>
                            {validJsonTwo ? "Valid JSON" : "Invalid JSON"}
                        </span>
                    }
                </div>
                <div className="panel-editor">
                    <MonacoEditor
                        value={inputTwo}
                        onChange={setInputTwo}
                        language="json"
                        theme="vs-dark"
                        options={{
                            wordWrap: "on",
                            fontSize: 14,
                        }}
                        minimap
                    />
                </div>
            </div>

            {/* Row 2 (middle): 50px tall spacer/toolbar spanning both columns */}
            {/* <div className="middle-row" /> */}

            {/* Row 3 (bottom): placeholder for future diff viewer */}
            <div className="bottom-slot">{/* future: diff viewer goes here */}</div>
        </div>
    )
}

export default Test
