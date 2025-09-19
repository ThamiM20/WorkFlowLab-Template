import Container from '@/components/layout/container';

export default async function TestPage() {
  return (
    <Container className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* No tests currently enabled */}
        <p>No tests currently enabled</p>
      </div>
    </Container>
  );
}
