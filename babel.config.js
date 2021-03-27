module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        ['@babel/preset-react', {
            runtime: 'automatic', //Deixa por padrão as importações do React em arquivos que usam sintaxe JSX
        }]
    ]
}