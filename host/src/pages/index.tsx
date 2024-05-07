import React from "react";

const ManageApp = React.lazy(() => import("manage/manageHome"));
const ManageTypescript = React.lazy(() => import("manage/manageTypescript"));
export default function Home() {
  return (
    <>
      <p>This is host</p>
      <ManageApp />
      <ManageTypescript />
    </>
  );
}
