function RowItem({item, addons=[]}) {
  let styleAddons = ''

  for (const addon of addons) {
    styleAddons += addon;
    styleAddons += ' '
  }

  return (
    <div className={styleAddons+"mx-0.5 my-1 p-2 rounded-lg"}>
        {item}
    </div>
  )
}

export default RowItem;