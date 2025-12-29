export function Button({ variant = 'primary', size = 'md', className = '', ...props }) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return <button className={classes} type="button" {...props} />
}
