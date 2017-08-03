package <%= package.lower %>.<%= project.lower %>.json;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Logger;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

/**
 *
 * @author 70744416353
 */
public class JsonDateDeserializer extends JsonDeserializer<Date> {

    private static final Logger LOG = Logger.getLogger(JsonDateDeserializer.class.getName());
    /**
     *
     * @param jsonparser
     * @param ctxt
     * @return
     * @throws IOException
     */
    @Override
    public Date deserialize(JsonParser jsonparser, DeserializationContext ctxt) throws IOException {
        String date = jsonparser.getText();
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            return dateFormat.parse(date);
        } catch (ParseException e) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
                return dateFormat.parse(date);
            } catch (ParseException e1) {
                throw new RuntimeException(e1);
            }
        }

    }

}
