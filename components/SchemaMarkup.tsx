type Props = {
  data: Record<string, unknown> | Array<Record<string, unknown> | null | undefined>;
};

export default function SchemaMarkup({ data }: Props) {
  const schemas = (Array.isArray(data) ? data : [data]).filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
