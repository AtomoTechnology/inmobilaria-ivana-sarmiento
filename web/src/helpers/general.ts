export const getColorBox = (text: string): string => {
  let color: string = '';
  switch (text) {
    case 'CE':
      color = '#016dbe';
      break;
    case 'MJ':
      color = '#e340ff';
      break;
    case 'EE':
      color = '#afaaaa';
      break;
    case 'VR':
      color = '#74c714';
      break;
    case 'HC':
      color = '#ff9800';
      break;
    case 'RN':
      color = '#00a495';
      break;
    case 'GA':
      color = '#016dbe';
      break;

    default:
      color = '#016dbe';
      break;
  }

  return color;
};
export  async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}
