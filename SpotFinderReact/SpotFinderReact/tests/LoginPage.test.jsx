import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import { AuthContext } from "../src/components/AuthContext";

// 🔧 Utilidad para renderizar con contexto y router
const renderWithProviders = (ui, { providerProps }) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("LoginPage", () => {
  it("muestra error si las credenciales son incorrectas", () => {
    const mockLogin = vi.fn(() => ({
      success: false,
      message: "Credenciales inválidas.",
    }));
    const providerProps = { login: mockLogin };

    renderWithProviders(<LoginPage />, { providerProps });

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "naxo@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(mockLogin).toHaveBeenCalledWith("naxo@example.com", "wrongpass");
    expect(screen.getByText("Credenciales inválidas.")).toBeInTheDocument();
  });

  it("llama a login y redirige si las credenciales son correctas", () => {
    const mockLogin = vi.fn(() => ({
      success: true,
      message: "Inicio de sesión exitoso.",
    }));
    const providerProps = { login: mockLogin };

    renderWithProviders(<LoginPage />, { providerProps });

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "naxo@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(mockLogin).toHaveBeenCalledWith("naxo@example.com", "123456");
  });
});
