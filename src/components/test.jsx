import MonacoEditor from "./Editor.jsx"
import { useState, useEffect } from "react"
import { Differ, Viewer } from "json-diff-kit"

import "./test.css"

const reset = "{}"
const viewerProps = {
    indent: 4,
    lineNumbers: true,
    highlightInlineDiff: true,
    inlineDiffOptions: {
        mode: "word",
        wordSeparator: " ",
    },
    hideUnchangedLines: true,
    syntaxHighlight: {
        theme: "monokai",
    },
    virtual: false,
}

const Test = () => {
    const [inputOne, setInputOne] = useState(reset)
    const [inputTwo, setInputTwo] = useState(reset)
    const [validJsonOne, setValidJsonOne] = useState(false)
    const [validJsonTwo, setValidJsonTwo] = useState(false)

    const [differ, setDiffer] = useState()
    const [diffResult, setDiffResult] = useState()

    const isValidJson = (str) => {
        try {
            JSON.parse(str)
            return true
        } catch (e) {
            console.log(e)
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

    useEffect(() => {
        if (!differ) {
            const d = new Differ({
                detectCircular: true,
                maxDepth: Infinity,
                showModifications: true,
                arrayDiffMethod: "lcs",
                ignoreCase: false,
                ignoreCaseForKey: false,
                recursiveEqual: true,
            })
            setDiffer(d)
        }
    }, [differ])

    useEffect(() => {
        if (inputOne && inputTwo && differ) {
            if (isValidJson(inputOne) && isValidJson(inputTwo)) {
                const d = differ.diff(JSON.parse(inputOne), JSON.parse(inputTwo))
                setDiffResult(d)
            }
        }
    }, [differ, inputOne, inputTwo])

    return (
        <div className="grid-root">
            {/* Row 1, Col 1: Left panel (toolbar + editor) */}
            <div className="panel">
                <div className="panel-toolbar">
                    <button className="panel-button" onClick={() => setInputOne(reset)}>Reset</button>
                    {
                        <span style={{ fontSize: "14px", color: validJsonOne ? "#99cc99" : "#f2777a" }}>
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
                    <button className="panel-button" onClick={() => setInputTwo(reset)}>Reset</button>
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

            {/* Row 2 (bottom): placeholder for future diff viewer */}
            <div className="result-slot">
                {diffResult && (
                    <Viewer
                        diff={diffResult} // required
                        {...viewerProps}
                    />
                )}
            </div>
        </div>
    )
}

export default Test
