# Document-help demo milestone

- [x] Confirm that case `0f53c0ad-26cc-4fc5-8d0d-e4d3e617f0cf` and `document-storage-test.pdf` have been removed from the Preview-only private Blob store.
- [x] Verify that the operator desk displays zero demo cases after the cleanup.
- [x] Update the storage architecture notes and recovery checklist with final operator-session and cleanup evidence.
- [ ] Deliver the Preview-only upload and protected operator URLs, with AI analysis, n8n, email, and provider actions remaining disabled.
- [ ] Obtain separate explicit approval before designing any AI extraction or workflow stage.
- [ ] Define the minimal structured extraction schema and operator-review copy for Preview-only document analysis.
- [ ] Add a seven-day deletion deadline to each private case record, block AI processing after expiry, and expose an operator-only deletion state.
- [ ] Upgrade the demo to server-side AI capability without exposing documents or model credentials to the client.
- [ ] Configure a dedicated AI provider API key as a Sensitive, Preview-only Vercel environment variable; never place it in source code, client code, or chat.
- [ ] Implement only an explicit operator-triggered extraction draft, with no email, Telegram, n8n, provider, affiliate, or legal-advice action.
- [ ] Verify extraction, restricted access, and retention behavior using non-personal test material before accepting customer documents.
