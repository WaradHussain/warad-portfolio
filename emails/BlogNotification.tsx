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
  postTitle: string
  postExcerpt: string
  postUrl: string
}

const baseUrl = 'https://waradhussain.com'

export default function BlogNotification({
  name,
  email,
  postTitle,
  postExcerpt,
  postUrl,
}: Props) {
  const greeting = name ? `Hey ${name},` : 'Hey,'
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(email)}`

  return (
    <Html lang="en">
      <Head />
      <Preview>{postTitle}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={topBar} />
          <Section style={content}>
            <Text style={label}>NEW POST</Text>
            <Text style={greeting_}>{greeting}</Text>
            <Section style={postCard}>
              <Text style={postTitle_}>{postTitle}</Text>
              <Text style={postExcerpt_}>{postExcerpt}</Text>
            </Section>
            <Link href={postUrl} style={button}>Read it →</Link>
            <Text style={signature}>— Warad</Text>
          </Section>
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              <Link href={baseUrl} style={footerLink}>waradhussain.com</Link>
              {'  ·  '}
              <Link href={unsubscribeUrl} style={unsubLink}>Unsubscribe</Link>
              {'  ·  '}
              <Link href="https://github.com/WaradHussain" style={unsubLink}>GitHub</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export async function renderBlogNotification(props: Props): Promise<string> {
  return await render(<BlogNotification {...props} />)
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
const content: React.CSSProperties = { padding: '36px 44px 32px' }
const label: React.CSSProperties = {
  color: '#00E87A',
  fontSize: '11px',
  fontFamily: 'monospace',
  letterSpacing: '3px',
  margin: '0 0 16px',
}
const greeting_: React.CSSProperties = {
  color: '#777777',
  fontSize: '15px',
  fontWeight: '400',
  margin: '0 0 20px',
  lineHeight: '1.8',
}
const postCard: React.CSSProperties = {
  backgroundColor: '#0d0d0d',
  borderLeft: '3px solid #00E87A',
  borderRadius: '0 10px 10px 0',
  padding: '18px 22px',
  marginBottom: '24px',
}
const postTitle_: React.CSSProperties = {
  color: '#F0F0F0',
  fontSize: '18px',
  fontWeight: '700',
  lineHeight: '1.35',
  margin: '0 0 10px',
}
const postExcerpt_: React.CSSProperties = { color: '#555555', fontSize: '14px', lineHeight: '1.7', margin: 0 }
const button: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: '#00E87A',
  color: '#000000',
  fontWeight: '700',
  fontSize: '14px',
  padding: '12px 26px',
  borderRadius: '10px',
  textDecoration: 'none',
}
const signature: React.CSSProperties = { color: '#444444', fontSize: '14px', margin: '28px 0 0' }
const divider: React.CSSProperties = { borderColor: '#1a1a1a', margin: '0 44px' }
const footer: React.CSSProperties = { padding: '20px 44px 28px' }
const footerText: React.CSSProperties = { color: '#333333', fontSize: '12px', margin: 0 }
const footerLink: React.CSSProperties = { color: '#00E87A', textDecoration: 'none' }
const unsubLink: React.CSSProperties = { color: '#444444', textDecoration: 'underline' }
