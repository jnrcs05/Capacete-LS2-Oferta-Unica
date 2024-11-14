import { CheckoutForm } from "@/components/CheckoutForm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CountdownTimer from "@/components/CountdownTimer";

const Index = () => {
  const images = [
    "/images/helmet-1.jpg",
    "/images/helmet-2.jpg",
    "/images/helmet-3.jpg",
    "/images/helmet-4.jpg",
    "/images/helmet-5.jpg",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">
            Capacetes LS2 - Qualidade e Segurança
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section with Countdown */}
        <section className="text-center space-y-4 animate-fade-in">
          <div className="flex justify-center mb-6">
            <CountdownTimer />
          </div>
          <Badge variant="secondary" className="mb-4">
            Promoção Especial
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            CAPACETE LS2 CLASSIC S
          </h2>
          <p className="text-gray-600 text-lg">
            Monocolor Preto - Edição Limitada
          </p>
        </section>

        {/* Product Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-in">
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square">
                      <img
                        src={image}
                        alt={`LS2 Capacete Vista ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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