import { Input } from "@/components/ui/input";

interface PersonalInfoFormProps {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

export const PersonalInfoForm = ({
  nome,
  email,
  telefone,
  endereco,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onAddressChange,
}: PersonalInfoFormProps) => {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => onNameChange(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))}
        required
        className="border-gray-300 focus:ring-black"
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        className="border-gray-300 focus:ring-black"
      />
      <Input
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => onPhoneChange(e.target.value)}
        required
        maxLength={15}
        className="border-gray-300 focus:ring-black"
      />
      <Input
        placeholder="Endereço completo"
        value={endereco}
        onChange={(e) => onAddressChange(e.target.value)}
        required
        className="border-gray-300 focus:ring-black"
      />
    </div>
  );
};