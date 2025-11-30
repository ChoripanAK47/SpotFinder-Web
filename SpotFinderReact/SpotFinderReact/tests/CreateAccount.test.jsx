import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CreateAccountPage from "../src/pages/CreateAccount";
import { AuthContext } from "../src/components/AuthContext";

// 🔧 Utilidad para renderizar con contexto y router
const renderWithProviders = (ui, { providerProps }) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("CreateAccountPage", () => {
  it("muestra error si las contraseñas no coinciden", () => {
    const mockCreateAccount = vi.fn();
    const providerProps = { createAccount: mockCreateAccount };

    renderWithProviders(<CreateAccountPage />, { providerProps });

    fireEvent.change(screen.getByLabelText("Nombre Completo:"), {
      target: { value: "Naxo Dev" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "naxo@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña:"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("Confirma contraseña:"), {
      target: { value: "654321" },
    });
    fireEvent.change(screen.getByLabelText("Género:"), {
      target: { value: "Hombre" },
    });
    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(
      screen.getByText("Las contraseñas no coinciden.")
    ).toBeInTheDocument();
    expect(mockCreateAccount).not.toHaveBeenCalled();
  });

  it("llama a createAccount si todo es válido", () => {
    const mockCreateAccount = vi.fn(() => ({ success: true }));
    const providerProps = { createAccount: mockCreateAccount };

    renderWithProviders(<CreateAccountPage />, { providerProps });

    fireEvent.change(screen.getByLabelText("Nombre Completo:"), {
      target: { value: "Naxo Dev" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "naxo@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña:"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("Confirma contraseña:"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText("Género:"), {
      target: { value: "Hombre" },
    });
    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(mockCreateAccount).toHaveBeenCalledWith({
      nombreCompleto: "Naxo Dev",
      email: "naxo@example.com",
      password: "123456",
      genero: "Hombre",
    });
  });
});
