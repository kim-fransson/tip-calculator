/* eslint-disable react-refresh/only-export-components */
import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export * from "@react-aria/test-utils";
export { customRender as render };
