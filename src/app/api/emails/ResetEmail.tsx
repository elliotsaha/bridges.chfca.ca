import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  Img,
} from '@react-email/components';
import * as React from 'react';

interface ResetEmailProps {
  first_name: string;
  last_name: string;
  url: string;
  old_email: string;
}

export const ResetEmail = ({
  first_name,
  last_name,
  url,
  old_email,
}: ResetEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your account email</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto font-sans bg-white">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Img
              src={`${process.env.NEXT_BRIDGES_LOGO_URI}`}
              alt="Bridges"
              height="40"
              className="mx-auto mt-4 object-fill"
            />
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Reset your email
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hey <b>{first_name}</b>, trying to reset your email? We received a
              request to reset your account email from <b>{old_email}</b> to
              this email. To change your account email to this email, click on
              the button below.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#232F6F] rounded text-white text-[12px] font-semibold no-underline text-center px-6 py-4"
                href={url}
              >
                Reset email
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link href={url} className="text-blue-600 no-underline">
                {url}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was intended for{' '}
              <span className="text-black">
                {first_name} {last_name}.
              </span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetEmail;
