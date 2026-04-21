import { Metadata } from 'next';

interface JSONLDProps {
  data: Record<string, unknown>;
}

export function JSONLD({ data }: JSONLDProps): React.JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default JSONLD;
