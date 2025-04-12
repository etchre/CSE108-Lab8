function RowItem({children, addons=['']}) {
  let styleAddons = ''

  for (const addon of addons) {
    styleAddons += addon;
    styleAddons += ' '
  }

  return (
    <div className={styleAddons+"px-4 py-2"}>
        {children}
    </div>
  )
}

export default RowItem;