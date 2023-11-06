import { Container } from "@/ui/components/container/container";
import Image from "next/image";

export const RegisterView = () => {
  return (
    <Container className="grid grid-cols-2 gap-20 mb-32">
      <div>
        <div className="relative w-full h-[531px]">
            <Image fill src="/assets/svg/charater-1.svg" alt="register" className=""/>
        </div>
      </div>
      <div> contenu</div>
    </Container>
  );
};
