/** Defines the props accepted by the SectionHeader. */
interface SectionHeaderProps {

  /** The header's display text. */
  label: string;
}

/** Component for displaying a styled title for a section. */
const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  return (
    <h1 className='text-3xl mb-2 text-gray-800'>
      {props.label}
    </h1>
  )
}

export default SectionHeader;
