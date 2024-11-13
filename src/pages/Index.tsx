import { CheckoutForm } from "@/components/CheckoutForm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 animate-fade-in">
          <Badge variant="secondary" className="mb-4">
            Promoção Especial
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            CAPACETE LS2 CLASSIC S
          </h1>
          <p className="text-gray-600 text-lg">
            Monocolor Preto - Edição Limitada
          </p>
        </section>

        {/* Product Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in">
            <div className="relative group">
              <img
                src="/placeholder.svg"
                alt="LS2 Capacete"
                className="w-full rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300 rounded-lg" />
            </div>
          </div>

          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200">
              <div className="space-y-4">
                <Badge className="bg-red-500 text-white hover:bg-red-600">
                  Queima de Estoque
                </Badge>
                <h2 className="text-3xl font-bold">R$ 80,00</h2>
                <p className="text-gray-600">
                  Frete Grátis para todo Brasil
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Design moderno e aerodinâmico</li>
                  <li>✓ Acabamento premium em preto fosco</li>
                  <li>✓ Sistema de ventilação avançado</li>
                  <li>✓ Viseira com proteção UV</li>
                  <li>✓ Interior removível e lavável</li>
                </ul>
              </div>
            </Card>

            <CheckoutForm />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;