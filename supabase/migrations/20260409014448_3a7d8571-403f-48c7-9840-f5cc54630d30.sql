-- Allow anon users to SELECT journal entries
CREATE POLICY "Anon can view entries"
ON public.journal_entries
FOR SELECT
TO anon
USING (true);

-- Allow anon users to INSERT journal entries
CREATE POLICY "Anon can insert entries"
ON public.journal_entries
FOR INSERT
TO anon
WITH CHECK (true);