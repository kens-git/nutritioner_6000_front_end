interface SectionHeaderProps {
  label: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  return (
    <h1 className='text-3xl mb-2 text-gray-800'>
      {props.label}
    </h1>
  )
}

export default SectionHeader;
