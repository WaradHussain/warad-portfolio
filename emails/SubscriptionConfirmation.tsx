import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Preview,
  render,
} from 'react-email'

interface Props {
  name?: string
  email: string
  isWelcomeBack?: boolean
}

const baseUrl = 'https://waradhussain.com'

export default function SubscriptionConfirmation({
  name,
  email,
  isWelcomeBack = false,
}: Props) {
  const greeting = name ? `Hey ${name},` : 'Hey,'
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`

  return (
    <Html lang="en">
      <Head />
      <Preview>{isWelcomeBack ? 'Welcome back.' : "You're subscribed."}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={topBar} />
          <Section style={content}>
            <Text style={h1}>{greeting}</Text>
            {isWelcomeBack ? (
              <>
                <Text style={p}>Welcome back. You&apos;re re-subscribed.</Text>
                <Text style={p}>
                  I&apos;ll email you when the next post is worth your time — same as before.
                </Text>
              </>
            ) : (
              <>
                <Text style={p}>
                  You&apos;re in. I write about agentic AI, software engineering
                  fundamentals, and real lessons from building things.
                </Text>
                <Text style={p}>
                  No schedule, no fluff — only when something&apos;s genuinely worth reading.
                </Text>
              </>
            )}
            <Link href={`${baseUrl}/blog`} style={button}>
              Read the latest post →
            </Link>
            <Text style={signature}>— Warad</Text>g
          </Section>
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              You subscribed at{' '}
              <Link href={baseUrl} style={footerLink}>waradhussain.com</Link>
              {'  ·  '}
              <Link href={unsubscribeUrl} style={unsubLink}>Unsubscribe</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Named export for render — used in API routes
export async function renderConfirmation(props: Props): Promise<string> {
  return await render(<SubscriptionConfirmation {...props} />)
}

const body: React.CSSProperties = {
  backgroundColor: '#0A0A0A',
  backgroundImage: 'radial-gradient(circle, #161616 1px, transparent 1px)',
  backgroundSize: '22px 22px',
  fontFamily: 'Arial, Helvetica, sans-serif',
  margin: 0,
  padding: '40px 16px',
}
const container: React.CSSProperties = {
  backgroundColor: '#111111',
  borderRadius: '16px',
  border: '1px solid #1F1F1F',
  maxWidth: '520px',
  margin: '0 auto',
  overflow: 'hidden',
}
const topBar: React.CSSProperties = {
  height: '3px',
  background: 'linear-gradient(90deg, #00E87A, #00c46a 50%, transparent)',
}
const content: React.CSSProperties = { padding: '40px 44px 32px' }
const h1: React.CSSProperties = {
  color: '#F0F0F0',
  fontSize: '20px',
  fontWeight: '700',
  margin: '0 0 24px',
  lineHeight: '1.3',
}
const p: React.CSSProperties = {
  color: '#777777',
  fontSize: '15px',
  lineHeight: '1.85',
  margin: '0 0 16px',
}
const button: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#00E87A',
  color: '#000000',
  fontWeight: '700',
  fontSize: '14px',
  padding: '12px 26px',
  borderRadius: '10px',
  textDecoration: 'none',
  marginTop: '8px',
}
const signature: React.CSSProperties = { color: '#444444', fontSize: '14px', margin: '28px 0 0' }
const divider: React.CSSProperties = { borderColor: '#1a1a1a', margin: '0 44px' }
const footer: React.CSSProperties = { padding: '20px 44px 28px' }
const footerText: React.CSSProperties = { color: '#333333', fontSize: '12px', lineHeight: '1.8', margin: 0 }
const footerLink: React.CSSProperties = { color: '#00E87A', textDecoration: 'none' }
const unsubLink: React.CSSProperties = { color: '#444444', textDecoration: 'underline' }
