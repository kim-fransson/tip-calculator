/* eslint-disable react-refresh/only-export-components */
import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { I18nProvider } from "react-aria-components";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <I18nProvider>{children}</I18nProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export * from "@react-aria/test-utils";
export * from "@testing-library/user-event";
export { customRender as render };
