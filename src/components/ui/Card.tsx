const Card: React.FC<{children: any}> = (props) => {
  return (
    <div className='my-2 p-2 border-2 rounded shadow-md'>
      {props.children}
    </div>
  );
}

export default Card;
