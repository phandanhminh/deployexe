export const Card = ({ children }) => {
  return <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div style={{ marginTop: '10px' }}>{children}</div>;
};
