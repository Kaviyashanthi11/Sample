import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const CustomTiny = ({ label, value, onChange, star }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1000);

  // Add event listener to handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditorChange = content => {
    onChange(content);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "flex-start" : "center",
        marginBottom: "16px"
      }}
    >
      <label
        style={{
          flex: isSmallScreen ? "none" : "0.98",
          marginBottom: isSmallScreen ? "8px" : "0"
        }}
      >
        {label} <span style={{ color: "red" }}>*</span>
      </label>
      <div
        style={{
          flex: isSmallScreen ? "none" : "1.6",
          width: "100%",
          marginLeft: isSmallScreen ? "" : "8px"
        }}
      >
        <Editor
          apiKey="ej7z7kiw2pa7jninca9igfvwhtyudh4pfodg6fvyuos6jmdk" // Ensure you use a real API key
          value={value}
          init={{
            height: 250,
            menubar: true,
            branding: false,
            statusbar: false,
            z_index: 9999,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
            menu: {
              edit: {
                title: "Edit",
                items: "undo redo | cut copy paste | selectall"
              },
              insert: {
                title: "Insert",
                items: "link image media | template | charmap | hr"
              },
              view: {
                title: "View",
                items: "visualaid | preview | fullscreen"
              },
              format: {
                title: "Format",
                items: [
                  "bold italic underline strikethrough superscript subscript code | formats blocks fonts fontSize align lineheight | forecolor backcolor | removeformat"
                ].join(" | ")
              }
            },
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default CustomTiny;
