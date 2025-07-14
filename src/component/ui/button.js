export const Button = ({ children, ...props }) => {
  return <button {...props} style={{ padding: '10px 20px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px' }}>{children}</button>;
};
