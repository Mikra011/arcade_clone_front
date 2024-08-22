import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';

export default function CodeEditor({ input }) {
    const [code, setCode] = useState(`function solution( ${input} ) {\n  // Write code here\n}`)

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const handleEditorDidMount = (editor, monaco) => {
        // Define a custom theme that matches the Tailwind bg-slate-800 color
        monaco.editor.defineTheme('custom-slate-theme', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#0f172a',
            },
        })
        editor.updateOptions({ theme: 'custom-slate-theme' })
    }

    return (
        <Editor
            height="100%"
            language="javascript"
            theme="custom-slate-theme" // Set the default theme here
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount} // Use the onMount callback to define the theme
            options={{
                selectOnLineNumbers: true,
                minimap: { enabled: false },
            }}
        />
    )
}
