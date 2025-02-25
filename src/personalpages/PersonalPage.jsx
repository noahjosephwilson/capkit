"use client";
import React from "react";

const PersonalPage = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1>Sample Page</h1>
        <p>This page is fully self-contained and uses only plain text.</p>
      </header>
      <main>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis
          sagittis ipsum.
        </p>
        <p>
          Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia
          arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos.
        </p>
      </main>
      <footer style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
        <p>&copy; 2025 SamplePage. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PersonalPage;
