import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentFormProps {
  nomeCartao: string;
  numeroCartao: string;
  validadeCartao: string;
  cvv: string;
  parcelas: "1" | "2";
  onCardNameChange: (value: string) => void;
  onCardNumberChange: (value: string) => void;
  onValidityChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onInstallmentChange: (value: "1" | "2") => void;
}

export const PaymentForm = ({
  nomeCartao,
  numeroCartao,
  validadeCartao,
  cvv,
  parcelas,
  onCardNameChange,
  onCardNumberChange,
  onValidityChange,
  onCvvChange,
  onInstallmentChange,
}: PaymentFormProps) => {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Nome no Cartão"
        value={nomeCartao}
        onChange={(e) => onCardNameChange(e.target.value)}
        required
        className="border-gray-300 focus:ring-black"
      />
      <Input
        placeholder="Número do cartão"
        value={numeroCartao}
        onChange={(e) => onCardNumberChange(e.target.value)}
        required
        maxLength={19}
        className="border-gray-300 focus:ring-black"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Validade (MM/AA)"
          value={validadeCartao}
          onChange={(e) => onValidityChange(e.target.value)}
          required
          maxLength={5}
          className="border-gray-300 focus:ring-black"
        />
        <Input
          placeholder="CVV"
          value={cvv}
          onChange={(e) => onCvvChange(e.target.value)}
          required
          maxLength={3}
          className="border-gray-300 focus:ring-black"
        />
      </div>
      <div className="space-y-2">
        <Label>Opções de Pagamento</Label>
        <RadioGroup
          value={parcelas}
          onValueChange={onInstallmentChange}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="1x" />
            <Label htmlFor="1x">1x de R$ 80,00</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="2x" />
            <Label htmlFor="2x">2x de R$ 40,00 sem juros</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};