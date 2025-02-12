create or replace function execute_query(query_text text)
returns jsonb
language plpgsql
security definer
as $$
begin
  return (
    select jsonb_agg(row_to_json(t))
    from (
      execute query_text
    ) t
  );
exception when others then
  raise exception 'Query execution failed: %', SQLERRM;
end;
$$; 