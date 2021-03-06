package <%= package.lower %>.<%= project.lower %>.json;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Logger;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 *
 * @author 70744416353
 */
public class JsonDateSerializer extends JsonSerializer<Date> {

    private static final Logger LOG = Logger.getLogger(JsonDateSerializer.class.getName());
    /**
     *
     * @param date
     * @param jgen
     * @param provider
     * @throws IOException
     */
    @Override
    public void serialize(Date date, JsonGenerator jgen, SerializerProvider provider) throws IOException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDate = dateFormat.format(date);
        jgen.writeString(formattedDate);
    }

}
