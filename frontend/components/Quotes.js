import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setHighlightedQuote,
  toggleVisibility,
} from '../state/quotesSlice'
import { useGetQuotesQuery, useUpdateQuoteMutation, useRemoveQuoteMutation } from '../state/quotesApi'
export default function Quotes() {
  const {data: quotes, isFetching: updatingQuotes, isLoading: loading} = useGetQuotesQuery()
  const [updateQuote, {isLoading: updating}] = useUpdateQuoteMutation()
  const [deleteQuote, {isLoading: deletion}] = useRemoveQuoteMutation()
  const displayAllQuotes = useSelector(st => st.quotesState.displayAllQuotes)
  const highlightedQuote = useSelector(st => st.quotesState.highlightedQuote)
  const dispatch = useDispatch()
  const onToggle = (id, boolean) => {
    updateQuote({id: id, boolean: !boolean})
  }
  return (
    <div id="quotes">
      <h3>Quotes {updatingQuotes || loading && 'are loading, please wait...'}</h3>
      <div>{updating && 'quote is updating'} {deletion && 'quote is in the process of being deleted'}</div>
      <div>
        {
          quotes?.filter(qt => {
            return displayAllQuotes || !qt.apocryphal
          })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => deleteQuote(qt.id)}>DELETE</button>
                  <button onClick={() => dispatch(setHighlightedQuote(qt.id))}>HIGHLIGHT</button>
                  <button onClick={() => onToggle(qt.id, qt.apocryphal)}>FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={() => dispatch(toggleVisibility())}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}