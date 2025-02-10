import React from "react";

const Tutorial = () => {
  const videos = [
    {
      title: "Introduction to Networking",
      description: "Learn the basics of computer networking.",
      videoUrl: "https://www.youtube.com/embed/gcYvQ92XyKE?si=6YB-ojCcnCEy2Ej2", // Replace with actual video ID
    },
    {
      title: "Understanding IP Addresses",
      description: "A detailed explanation of IP addresses and their types.",
      videoUrl: "https://www.youtube.com/embed/dH5mOkzUN_U?si=tXedgcmZ4NYIy1ur", // Replace with actual video ID
    },
    {
      title: "TCP / IP Details Networking system",
      description: "Learn about TCP/IP, HTTP, FTP, and other protocols.",
      videoUrl: "https://www.youtube.com/embed/Ceige2RadEA?si=WyWkfe111uGqSWQy", // Replace with actual video ID
    },
    {
      title: "How to increase internet speed",
      description: "Step-by-step guide to increase internet speed.",
      videoUrl: "https://www.youtube.com/embed/C_lngCyAyx4?si=h_rNNWNl8ydIYzBu", // Replace with actual video ID
    },
  ];

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Network Video Tutorials</h1>
        <div className="space-y-8">
          {videos.map((video, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl">{video.title}</h2>
                <p className="text-gray-600">{video.description}</p>
                <div className="mt-4" style={{ height: "400px" }}> {/* Adjust height here */}
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;