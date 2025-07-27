export function drawStatusText(context, input, player) {
    context.font = '28px Helvetica';
    context.fillText('Úlitmo comando: ' + input.lastKey, 20, 50);
    context.fillText('Estado atual: ' + player.currentState.state, 20, 90);
}