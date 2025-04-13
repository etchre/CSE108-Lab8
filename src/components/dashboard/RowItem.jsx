function RowItem({children, addons=['']}) {
  let styleAddons = ''

  for (const addon of addons) {
    styleAddons += addon;
    styleAddons += ' '
  }

  return (
    <div className={styleAddons+""}>
        {children}
    </div>
  )
}

export default RowItem;