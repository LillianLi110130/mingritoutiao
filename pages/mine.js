import React from "react";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/layout";

export default function Mine() {
  useAuth();
  return (
    <Layout>
      <h1>Mine</h1>
    </Layout>
  );
}
