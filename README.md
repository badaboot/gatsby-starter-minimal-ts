## 🚀 Quick start

2.  **Start developing.**

    Navigate into site’s directory and start it up.

    ```shell
    npm install
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

## Useful scripts

`find . -not -path './.git/*' -not -name '.git' -type f -exec stat -f '%Sm %N' -t '%Y-%m-%d %H:%M:%S' {} \; | sort`
Lists non .git files in `2025-04-09 23:06:09 ./money/entertainer.jpg` format, good to turn into `metadata.json` rows.

Alternatively use `src/images/gallery/add_to_metadata.sh` to get json rows to add to `metadata.json`.
