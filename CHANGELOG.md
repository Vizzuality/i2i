# Changelog

## Unreleased (deployed in staging)

### Added

- Added country and regional tags to initiatives cards
- Analysis from pin dropped by user in geospatial-data / calculate proximity
- Population widget added to geospatial data header
- Videos section added to geospatial portal header
- Added Icomoon
- New analysis icon added to analizable layers (all sectors and some contextual) in sidebar menu
- Filter and message that shows user analysis is just available to sector and some contextual layers
- Added styles for alert messages
- Added thank you message after the user requests to download
- Analyze pattern analysis in sidebar menu
- Analysis by clicking on map added to "Proximity" and "Analyze patterns" in sidebar
- Added filters for search results
- Added filters on the insights page
- Added year selector inside legend sector layers.
- Link to download widgetdata in CSV
- New widgets added for specific countries in (data-portal/geospatial-data)
	- Population sex percentage
	- Settlement areas
	- Agro-ecological zones
- MSME section in the data portal page
- New section Openi2i portal on the Research themes page
- Option to print widgets added to sidebar

### Changed

- Make initiatives and tabs alphabetically
- Show related initiatives ordered by score and date desc
- Unified styles for the insights cards
- Changed header for articles and blog posts
- Social links are visible all time in blogs, articles and news
- Search bar in the header
- Sidebar tabs styles updated/icons added
- Styles in layers menu (data-portal/geospatial-data)
- Styles for bullet on article text list
- Possibility of collapse sidebar in map removed
- Button for National Surveys added in sidebar
- Sidebar menu updated (styles and functionality)
- Map legend Styles
- User icon on the header now have a explicit text
- Iniatives becomes to Research themes
- Changed contact form in order to send messages from server instead Salesforce
- Changed color and size for tags inside cards for insights
- Widapp/javascript/components/intro/gets restyled and moved from Vega to Recharts 
- Haiti logo moved in intro
- Videos section in geospatial portal opened in overlay

### Fixed

- Issue compiling assets using webpacker
- Homepage button style issue in Safari
- Issue with National Services button in localhost and staging
- Fixed an issue where user didn't see any feedback after request a new password
- Fixed an error where user didn't receive an email after request a new password
- Fixed a syntax error in Hotjar library
- Fixed icon alignment in the download modal form
- Fixed an issue where search by iso doesn't return any result
- Fixed an issue where scroll jumps to the top of the page when user clicks on "Show more" button
- Fixed an issue where contact form message wasn't being sent
- Fixed an error when user request to download on the national surveys page
- Fixed an issue where user only received one link instead multiple on download modal
