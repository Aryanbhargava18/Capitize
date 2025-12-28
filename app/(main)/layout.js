import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="container mx-auto pt-24 pb-12 px-4 md:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default MainLayout;
