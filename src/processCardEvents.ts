import { CardEvent, Transaction } from './types'

type CardTransactionMapping = {
  [cardId: string]: Transaction
}

/**
 * Write a function that receives a large batch of card events from multiple cards,
 * returning an object which maps from cardId -> valid transaction. Only cardIds with
 * a valid transaction should appear in the returned object.
 *
 * A valid transaction is a pair of card events, starting with a RESERVATION event
 * and finishing with either a CONFIRMATION or CANCELLATION event.
 *
 * The input is an array of unprocessed card events. Some events might be duplicated
 * or missing. For duplicated events, you may only use one of its occurrences and
 * discard the rest. Missing events invalidate the transaction.
 *
 * @param cardEvents CardEvent[] List of card events
 * @returns CardTransactionMapping Valid transactions grouped by cardId
 */
export const processCardEvents = (cardEvents: CardEvent[]): CardTransactionMapping => {
  let keys: string[] = []

  let values: string[] = []
  let result: object[] = []

  for (let i = 0; i < cardEvents.length; i++) {
    // console.log('cardEvents[i]:', cardEvents[i])
    // console.log('keys:', keys, values)
    if (keys.includes(cardEvents[i].cardId)) {
      if (values.includes(cardEvents[i].type)) {
        // no push
      } else {
        keys.push(cardEvents[i].cardId)
        values.push(cardEvents[i].type)
        // CardTransactionMapping[ardEvents[i].cardId]
        result.push(cardEvents[i])
      }
    } else {
      //no value present
      keys.push(cardEvents[i].cardId)
      values.push(cardEvents[i].type)
      result.push(cardEvents[i])
    }
  }

  // logic
  console.log('result:', result)
  return { result } as CardTransactionMapping
}
